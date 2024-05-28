using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class DragonMove : MonoBehaviour
{
    
    [SerializeField] private float normalSpeed = 3.5f;
    [SerializeField] private float attackSpeed = 7f;
    
    private double AttackDist = 15;
    private int MoveDist = 25;
    
    private bool swooping = false;
    
    public NavMeshAgent agent;
    public GameObject player;
    
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(transform.position, player.transform.position) <= MoveDist)
        {
            agent.SetDestination(player.transform.position);
            if (Vector3.Distance(transform.position, player.transform.position) <= AttackDist)
            {
                agent.speed = 0f;
                if (!swooping)
                {
                    SwoopIn(player);
                    swooping = true;
                }
            }
            else
            {
                agent.speed = normalSpeed;
            }
        }
    }

    private void SwoopIn(GameObject target)
    {
        while (transform.position != target.transform.position)
        {
            transform.LookAt(target.transform);
            transform.position += transform.forward * attackSpeed * Time.deltaTime;
        }
        Debug.Log("hit");
        swooping = false;
    }
    
    private void OnTriggerEnter(Collider other)
    {
        // Debug.Log("enemy hit");
        if (other.gameObject.CompareTag("Bullet"))
        {
            Destroy(gameObject);
        }
    }
}
