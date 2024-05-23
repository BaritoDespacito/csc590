using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class CrawlerMove : MonoBehaviour
{
    private Animator crawlerAnimator;
    
    [SerializeField] private float normalSpeed = 3.5f;
    [SerializeField] private float attackSpeed = 7f;
    
    private double AttackDist = 2;
    private int MoveDist = 25;
    
    public NavMeshAgent agent;
    public GameObject player;
    
    // Start is called before the first frame update
    void Start()
    {
        crawlerAnimator = GetComponent<Animator>();
        player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(transform.position, player.transform.position) <= MoveDist)
        {
            agent.SetDestination(player.transform.position);
            Debug.Log(player.transform.position);
            if (Vector3.Distance(transform.position, player.transform.position) <= AttackDist)
            {
                agent.speed = attackSpeed;
                if (crawlerAnimator is not null)
                {
                    if (!crawlerAnimator.GetCurrentAnimatorStateInfo(0).IsName("pounce"))
                    {
                        crawlerAnimator.SetTrigger("isPouncing");   
                    }
                }
            }
            else
            {
                agent.speed = normalSpeed;
                if (crawlerAnimator is not null)
                {
                    if (!crawlerAnimator.GetCurrentAnimatorStateInfo(0).IsName("crawl") && !crawlerAnimator.GetCurrentAnimatorStateInfo(0).IsName("crawl_fast"))
                    {
                        crawlerAnimator.SetTrigger("isRunning");
                    }
                }
            }
        }
    }
}
